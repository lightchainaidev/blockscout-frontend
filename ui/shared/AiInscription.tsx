import {
  chakra,
} from '@chakra-ui/react';
import { memo } from 'react';

type Props = {
  inscription: string | null | undefined;
};

const AiInscription = ({ inscription }: Props) => {

  // const words = useMemo(() => {
  //   if (!inscription || !isHex(inscription)) return '';
  //   try {
  //     const json = JSON.parse(hexToString(inscription)) as Record<string, string>;

  //     return json.data;
  //   } catch (e) {
  //     return '';
  //   }

  // }, [ inscription ]);

  return <chakra.span>{ inscription }</chakra.span>;
};

export default memo(AiInscription);
