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
  Link,
} from '@chakra-ui/react';
import React from 'react';

const AddressModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Link className="transaction-btn-connect address-modal-btn address-modal-btn-request lcai-border-btn" href="#" isExternal>
          Request Manual Review
        </Link>
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
                    67abf58ec0cc43d0401b1716e
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">
                    ContactAddress:
                  </span>
                  <span className="address-modal-list-text">
                    0xFB122130C4d28860dbC050A8e024A71a558eB0C1
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">CreatedAt:</span>
                  <span className="address-modal-list-text">
                    2025-02-12T01:12:46.724+00:00
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">Status:</span>
                  <span className="address-modal-list-text address-success-100">
                    Completed
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">UpdateddAt:</span>
                  <span className="address-modal-list-text">
                    2025-02-12T01:12:46.724+00:00
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">Risk Level:</span>
                  <span className="address-modal-list-text address-success-100">
                    Low
                  </span>
                </li>
                <li>
                  <span className="address-modal-list-tag">
                    Security Score:
                  </span>
                  <Box display="flex" alignItems="center" gap={ 3 }>
                    <Progress
                      className="address-progress"
                      value={ 90 }
                      size="xs"
                      colorScheme="pink"
                      width={ 180 }
                    />
                    <span className="address-modal-list-text">90</span>
                  </Box>
                </li>
              </ul>

              { /* Sublist Section */ }
              <ul className="address-modal-sublist">
                <li>
                  <span className="address-modal-list-tag">Findings:</span>
                  <ul className="address-modal-sublist-list">
                    <li>
                      <span className="address-modal-list-tag">
                        Best Practice:
                      </span>
                      <span className="address-modal-list-text">
                        Use a re-entrancy guard. Though there is no current...
                      </span>
                    </li>
                    <li>
                      <span className="address-modal-list-tag">
                        Best Practice:
                      </span>
                      <span className="address-modal-list-text">
                        Add comments to the functions to improve readability...
                      </span>
                    </li>
                    <li>
                      <span className="address-modal-list-tag">
                        Best Practice:
                      </span>
                      <span className="address-modal-list-text">
                        The contract could benefit from event logging. Even...
                      </span>
                    </li>
                    <li>
                      <span className="address-modal-list-tag">
                        Best Practice:
                      </span>
                      <span className="address-modal-list-text">
                        Consider separating the concerns of the contract...
                      </span>
                    </li>
                    <li>
                      <span className="address-modal-list-tag">Issue:</span>
                      <span className="address-modal-list-text">
                        No access control is implemented. Currently, any user
                        can...
                      </span>
                    </li>
                    <li>
                      <span className="address-modal-list-tag">Fix:</span>
                      <span className="address-modal-list-text">
                        Implement an access control mechanism such as
                        OpenZeppelin's...
                      </span>
                    </li>
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
