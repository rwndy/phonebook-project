import styled from "@emotion/styled";
import { contact } from "../../../Models/get_contact_list";

interface PropsListContact {
  contact: contact;
}

const ListContact = ({ contact }: PropsListContact) => {
  return (
    <CardWrapper key={contact.id}>
      <NameContact>
        <strong>{contact.first_name}</strong> {contact.last_name}
      </NameContact>
      <PhoneNumber>mobile phone: {contact.phones[0].number}</PhoneNumber>
      {/* <p>
                {contact.phones.map((phone: phones, phoneIndex: number) => (
                  <span key={phoneIndex}>
                    Phone Number: {phone.number}
                    {phoneIndex < contact.phones.length - 1 && <br />}
                  </span>
                ))}
              </p> */}
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
