// eslint-disable-next-line no-restricted-imports
import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalHeader,
  useDisclosure,
  Box,
  Progress,
  ModalBody,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';

import type { AIAudit } from 'types/api/aiAudit';

const AddressModal = ({ audit }: { audit?: AIAudit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const riskLevelColor = useMemo(() => {
    if (audit?.riskLevel === 'High') return 'address-error-100';
    if (audit?.riskLevel === 'Medium') return 'address-warning-100';
    if (audit?.riskLevel === 'Low') return 'address-success-100';
    return 'address-success-100';
  }, [ audit?.riskLevel ]);

  const statusColor = useMemo(() => {
    if (audit?.status === 'completed') return 'address-success-100';
    if (audit?.status === 'pending') return 'address-warning-100';
    if (audit?.status === 'failed') return 'address-error-100';
    return 'address-success-100';
  }, [ audit?.status ]);

  const time = useMemo(() => {
    if (audit?.createdAt) return new Date(audit?.createdAt).toLocaleString();
    return '';
  }, [ audit?.createdAt ]);

  if (!audit) return null;
  return (
    <>
      <Box>
        <Box
          mt={{ base: '24px', md: '10px' }}
          display="flex"
          justifyContent="center"
          gap={ 5 }
          mb={ 4 }
        >
          <Button
            className="transaction-btn-connect address-modal-btn lcai-solid-btn"
            onClick={ onOpen }
          >
            Audit Report
          </Button>
        </Box>
        { /* <Link className="transaction-btn-connect address-modal-btn address-modal-btn-request lcai-border-btn" href="#" isExternal>
          Request Manual Review
        </Link> */ }
      </Box>

      <div className="address-modal-wrapper">
        <Modal isOpen={ isOpen } onClose={ onClose } scrollBehavior="inside">
          <ModalOverlay/>
          <ModalContent p={ 0 } overflow="hidden">
            <Box
              className="address-modal-head"
              pl={ 8 }
              py={ 3 }
              pr={ 3 }
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ModalHeader className="address-modal-title" minW={ 200 } mb={ 0 }>
                Audit Report Details
              </ModalHeader>
              <CloseIcon
                className="address-modal-close-icon"
                boxSize={ 4 }
                onClick={ onClose }
                cursor="pointer"
              />
            </Box>

            { /* Scrollable Modal Body */ }
            <ModalBody
              className="address-modal-body"
              maxHeight="800px"
              overflowY="auto"
              px={ 8 }
              py={ 8 }
            >
              <ul className="address-modal-list">
                <li>
                  <span className="address-modal-list-tag">ID:</span>
                  <span className="address-modal-list-text">
                    { audit._id }
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">
                    ContactAddress:
                  </span>
                  <span className="address-modal-list-text">
                    { audit.contractAddress }
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">Status:</span>
                  <span className={ `address-modal-list-text ${ statusColor }` }>
                    { audit.status }
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">Risk Level:</span>
                  <span className={ `address-modal-list-text ${ riskLevelColor }` }>
                    { audit.riskLevel }
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">CreatedAt:</span>
                  <span className="address-modal-list-text">
                    { time }
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">
                    Security Score:
                  </span>
                  <Box display="flex" alignItems="center" gap={ 3 }>
                    <Progress
                      className="address-progress"
                      value={ audit.securityScore }
                      size="xs"
                      colorScheme="pink"
                      width={ 180 }
                    />
                    <span className="address-modal-list-text">{ audit.securityScore }</span>
                  </Box>
                </li>
              </ul>

              { /* Sublist Section */ }
              <ul className="address-modal-sublist">
                <li>
                  <span className="address-modal-list-tag">Findings:</span>
                  <ul className="address-modal-sublist-list">
                    { audit.findings?.issues.map((item, key) => (
                      <li key={ `issue-${ key }` }>
                        <span className="address-modal-list-tag">
                          ISSUE:
                        </span>
                        <span className="address-modal-list-text">
                          { item }
                        </span>
                      </li>
                    )) }
                    { audit.findings?.fixes.map((item, key) => (
                      <li key={ `fix-${ key }` }>
                        <span className="address-modal-list-tag">
                          FIX:
                        </span>
                        <span className="address-modal-list-text">
                          { item }
                        </span>
                      </li>
                    )) }
                    { audit.findings?.bestPractices.map((item, key) => (
                      <li key={ `best-practice-${ key }` }>
                        <span className="address-modal-list-tag">
                          BEST PRACTICE:
                        </span>
                        <span className="address-modal-list-text">
                          { item }
                        </span>
                      </li>
                    )) }
                  </ul>
                </li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default AddressModal;
