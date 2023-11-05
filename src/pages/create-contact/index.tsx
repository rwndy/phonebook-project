import { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "../../components";
import { AddCircleRounded as AddCircleRoundedIcon } from "@mui/icons-material";
import { ADD_CONTACT_WITH_PHONES } from "../../apollo/queries/addContactWithPhones";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface FormValue {
  first_name: string;
  last_name: string;
  phones: Phone[];
}

type Phone = {
  number: string;
};

const CreateNewContact = () => {
  const [formContact, setFormContact] = useState<FormValue>({
    first_name: "",
    last_name: "",
    phones: [],
  });

  const [showInputPhone, setShowInputPhone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const [addContactWithPhones] = useMutation(ADD_CONTACT_WITH_PHONES);

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setFormContact({ ...formContact, [target.name]: value });

    setError("");
  };

  const handlePhoneNumber = (e: React.ChangeEvent, index: number) => {
    const initialValue = { ...formContact, phones: [...formContact.phones] };
    const target = e.target as HTMLInputElement;
    initialValue.phones[index].number = target.value;
    setFormContact(initialValue);
  };

  const handleAddInputPhone = () => {
    setShowInputPhone(true);
    setFormContact({
      ...formContact,
      phones: [...formContact.phones, { number: "" }],
    });
  };

  const handleDeletPhone = (id: number) => {
    const initValue = { ...formContact, phones: [...formContact.phones] };
    initValue.phones.splice(id, 1);
    setFormContact(initValue);
  };

  const handleSubmit = async () => {
    const hasSpecialCharacters = checkSpecialCharacters();

    if (hasSpecialCharacters) {
      setError("Contact name cannot have special characters.");
      return;
    }

    try {
      setLoading(true);

      await addContactWithPhones({
        variables: {
          first_name: formContact.first_name,
          last_name: formContact.last_name,
          phones: formContact.phones,
        },
      });

      setFormContact({
        first_name: "",
        last_name: "",
        phones: [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding contact:", error);

      setLoading(false);
    }
  };

  const checkSpecialCharacters = () => {
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      specialCharactersRegex.test(formContact.first_name) ||
      specialCharactersRegex.test(formContact.last_name)
    );
  };

  const isFormValid = () => {
    return (
      formContact.first_name.trim() !== "" &&
      formContact.last_name.trim() !== ""
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Main>
      <Title>New Contact</Title>
      <Content>
      {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          inputType="first_name"
          value={formContact.first_name}
          placeholder="Input your first name"
          onChange={handleChange}
          name="first_name"
        />
        <Gap />
        <Input
          inputType="last_name"
          value={formContact.last_name}
          placeholder="Input your last name"
          onChange={handleChange}
          name="last_name"
        />
        <Gap />
        <WrapperInput onClick={handleAddInputPhone}>
          <IconAddPhone />
          <InputAddPhone readOnly placeholder="add phone" />
        </WrapperInput>
        <Gap />

        {showInputPhone &&
          formContact.phones.map((phone: Phone, index: number) => (
            <>
              <Input
                key={index}
                placeholder="Input your phonenumber"
                value={phone.number}
                onChange={(e) => handlePhoneNumber(e, index)}
                inputType="phone"
                onDeletePhone={() => handleDeletPhone(index)}
              />
              <Gap />
            </>
          ))}
        <ButtonContainer>
          <ButtonCancel onClick={handleCancel}>Cancel</ButtonCancel>
          <ButtonSubmit
            onClick={handleSubmit}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Loading..." : "Submit"}
          </ButtonSubmit>
        </ButtonContainer>
      </Content>
    </Main>
  );
};

const Main = styled.main`
  padding: 2rem 1.6rem;
  height: 100vh;
`;

const Title = styled.h4`
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 1rem;
`;

const Gap = styled.div`
  margin-bottom: 2rem;
`;

const IconAddPhone = styled(AddCircleRoundedIcon)`
  position: absolute;
  left: 8px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: #4a4a4a;
`;

const WrapperInput = styled.div`
  position: relative;
  display: flex;
  jutify-items: center;
  width: 100%;
`;

const InputAddPhone = styled.input`
  border: 1px solid #d6ffde;
  padding: 1rem 3.4rem;
  width: 100%;
  border-radius: 0.8rem;
  outline: none;
  color: #3a3a3a;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
`;

const ButtonSubmit = styled.button`
  border: 1px solid #fff;
  padding: 10px 30px;
  border-radius: 8px;
  text-align: center;
  background: transparent;
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

const ButtonCancel = styled.button`
  border: none;
  padding: 10px 30px;
  background-color: #f63f54;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
export default CreateNewContact;
