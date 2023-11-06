import styled from "@emotion/styled";
import { contact } from "../../../Models/get_contact_list";
import { useAppContext } from "../../../context/AppContext";

interface PropsListContact {
  contact: contact;
}

const ListContact = ({ contact }: PropsListContact) => {

  const { setUserId, setIsModalOpen } = useAppContext()

  const openModal = () => {
    setUserId(contact.id)
    setIsModalOpen(true)
  }

  return (
    <CardWrapper onClick={() => openModal()}>
      <NameContact>
        <strong>{contact.first_name}</strong> {contact.last_name}
      </NameContact>
      <PhoneNumber>mobile phone: {contact.phones[0].number}</PhoneNumber>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  border-bottom: 1px solid #ebffef;
  margin-bottom: 10px;
  padding-bottom: 8px;
  cursor: pointer;
`;

const NameContact = styled.p`
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 4px;
`;

const PhoneNumber = styled.p`
  font-size: 14px;
  line-height: 18px;
`;

export default ListContact;
