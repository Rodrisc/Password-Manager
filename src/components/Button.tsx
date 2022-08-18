import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest }: Props) {

  return (
    <ButtonNativeBase
      bg='#5C9DF2'
      h={12}
      fontSize='sm'
      rounded='sm'
      _pressed={{ bg: "#1E6FD9" }}
      {...rest}

    >
      <Heading color='white' fontSize='sm'>{title}</Heading>
    </ButtonNativeBase>
  )
}