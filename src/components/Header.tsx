import { HStack, StyledProps, Heading, useTheme, IconButton } from 'native-base';
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type Props = StyledProps & {
  title: string
}



export function Header({ title, ...rest }: Props) {

  const navigation = useNavigation()

  const { colors } = useTheme()

  // function handleGoBack(){
  //   navigation.goBack()
  // }

  return (
    <HStack
      w='full'
      justifyContent='space-between'
      alignItems='center'
      bg='#5C9DF2'
      pb={5}
      pt={12}
      {...rest}
    >

      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={() => navigation.goBack()}
      />

      <Heading color='gray.100' textAlign='center' flex={1} ml={-6} fontSize='lg'>
        {title}
      </Heading>
    </HStack>
  );
}
