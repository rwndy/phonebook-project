import { Search as SearchIcon } from "@mui/icons-material";
import { Person as PersonIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

interface PropsInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
}

const Input = ({ value, onChange, type, ...rest }: PropsInput) => {
  
  const RenderIcon = () => {
    switch (type) {
      case "search":
        return <SearchButton />;
      case "first_name":
      case "last_name":
        return <IconUser />
      default:
        return <SearchButton />;
    }
  };

  return (
    <WrapperInput>
      <InputText type="text" value={value} onChange={onChange} {...rest} />
      <RenderIcon />
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

export default Input;
