import {
  Search as SearchIcon,
  LocalPhone as LocalPhoneIcon,
  Person as PersonIcon,
  RemoveRounded as RemoveRoundedIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

interface PropsInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
  placeholder: string;
  name?: string;
  onDeletePhone?: () => void | undefined
}

const Input = ({
  value,
  onChange,
  inputType,
  onDeletePhone,
  ...rest
}: PropsInput) => {
  const RenderIcon = () => {
    switch (inputType) {
      case "search":
        return <SearchButton />;
      case "first_name":
      case "last_name":
        return <IconUser />;
      case "phone":
        return <IconPhone />;
      default:
        return <SearchButton />;
    }
  };

  return (
    <WrapperInput>
      <InputText type="text" value={value} onChange={onChange} {...rest} />
      <RenderIcon />
      {inputType === "phone" && (
        <div onClick={onDeletePhone} onKeyDown={onDeletePhone}>
          <IconRemove />
        </div>
      )}
    </WrapperInput>
  );
};

const WrapperInput = styled.div`
  position: relative;
  display: flex;
  justify-items: center;
  width: 100%;
`;
const InputText = styled.input`
  border: 1px solid #d6ffde;
  padding: 1rem 3.4rem;
  width: 100%;
  border-radius: 0.8rem;
  outline: none;
  color: #3a3a3a;
`;

const SearchButton = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: #4a4a4a;
`;

const IconUser = styled(PersonIcon)`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: #4a4a4a;
`;

const IconPhone = styled(LocalPhoneIcon)`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: #4a4a4a;
`;

const IconRemove = styled(RemoveRoundedIcon)`
  position: absolute;
  right: 18px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: red;
`;

export default Input;
