import React from "react";
import Modals from "../Modals";
import { useAppContext } from "../../../context/AppContext";
import { Global, css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { GET_CONTACT_DETAIL } from "../../../apollo/queries/getContactDetail";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DELETE_CONTACT_PHONE } from "../../../apollo/queries/deleteContactList";
import { GET_CONTACT_LIST_QUERY } from "../../../apollo/queries/getContactList";

const ModalDetail = () => {
  const {
    closeModal,
    isModalOpen,
    userId,
    addFavorites,
    setUserId,
    setIsModalOpen,
    favorites,
    setFavorites
  } = useAppContext();

  const hasUserId = userId !== null || userId !== 0;

  const { loading, error, data } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id: userId },
    skip: !hasUserId,
  });

  const [deleteContact] = useMutation(DELETE_CONTACT_PHONE, {
    refetchQueries: [GET_CONTACT_LIST_QUERY],
  });

  if (!isModalOpen || !hasUserId) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const contact = data.contact_by_pk;
  const payload = {
    first_name: contact?.first_name,
    last_name: contact?.last_name,
    id: contact?.id,
    phones: contact?.phones,
  };

  const handleDeleteContact = () => {
    deleteContact({
      variables: { id: contact?.id },
    });
    setIsModalOpen(false);
    setUserId(0);
  };

  const handleAddFavorite = () => {
    const removed = favorites.filter((favorite) => favorite.id !== contact.id)

    localStorage.setItem('favorites', JSON.stringify(removed));
    setFavorites(removed)
    addFavorites(payload)
  }

  return (
    <>
      <Global
        styles={css`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999;contact?.first_name
          }
        `}
      />

      <Modals id="modal" className="modal" section="div">
        <ModalOverlay onClick={closeModal} />
        <ModalContent isModal={isModalOpen && hasUserId}>
          <TitleModal>Detail Contact</TitleModal>
          <ContainerDetail>
            <ContactName>First Name: {}</ContactName>
            <Gap />
            <ContactName>Last Name: {contact?.last_name}</ContactName>
            <Gap />
            <PhoneNumber>
              {contact?.phones.map((phone: any, phoneIndex: number) => (
                <span key={phoneIndex}>
                  Phone Number: {phone.number}
                  {phoneIndex < contact.phones.length - 1 && <br />}
                </span>
              ))}
            </PhoneNumber>
            <WrapperButton>
              <ButtonFavorites onClick={handleAddFavorite}>
                Add to favorites
              </ButtonFavorites>

              <ButtonDelete onClick={handleDeleteContact}>
                Delete Contact
              </ButtonDelete>
            </WrapperButton>
          </ContainerDetail>
        </ModalContent>
      </Modals>
    </>
  );
};

const moveInBottom = keyframes`
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
`;

const moveFromBottom = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
`;

const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div<{ isModal: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  border-radius: 8px 8px 0 0;
  height: calc(100% - 50%);
  animation: ${({ isModal }) =>
    isModal
      ? css`
          ${moveInBottom} 0.25s ease 0s
        `
      : css`
          ${moveFromBottom} 2s ease 0s
        `};
  overflow-y: auto;
`;

const TitleModal = styled.h4`
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
  color: #4a4a4a;
`;

const ContactName = styled.p`
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 4px;
  color: #4a4a4a;
`;

const PhoneNumber = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #4a4a4a;
`;

const Gap = styled.div`
  margin-bottom: 1rem;
`;

const ContainerDetail = styled.div`
  padding: 30px 16px;
  height: 100%;
`;

const ButtonFavorites = styled.button`
  border: 1px solid #4fd15a;
  background: transparent;
  padding: 8px 16px;
  border-radius: 10px;
  color: #4fd15a;
`;

const ButtonDelete = styled.button`
  border: none;
  background: #f63f54;
  padding: 8px 16px;
  border-radius: 10px;
  color: #fff;
`;

const WrapperButton = styled.div`
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
export default ModalDetail;
