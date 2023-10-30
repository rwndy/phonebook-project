import { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Input, Pagination } from "../../components";
import { GET_CONTACT_LIST_QUERY } from "../../apollo/queries/getContactList";
import { contact } from "../../Models/get_contact_list";
import { Add as AddIcon } from "@mui/icons-material";

const Home = () => {
  const [name, setSearchName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data } = useQuery(GET_CONTACT_LIST_QUERY, {
    variables: {
      order_by: { first_name: "asc" },
      where: { first_name: { _like: `%${name}%` } },
      limit: 10,
      offset: (currentPage - 1) * 10,
    },
    onCompleted: (data) => {
      const totalItems = data.totalCount.aggregate.count;
      setTotalPages(Math.ceil(totalItems / 10));
    },
  });

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Main>
      <WrapperTitle>
        <Title>Contacts</Title>
        <AddForm />
      </WrapperTitle>
      <Input
        value={name}
        onChange={(event) => setSearchName(event.target.value)}
        placeholder="Search your contact"
        type="search"
      />
      <Content>
        {data?.contact?.length > 0 &&
          data?.contact?.map((contact: contact) => (
            <CardWrapper key={contact.id}>
              <NameContact>
                <strong>{contact.first_name}</strong> {contact.last_name}
              </NameContact>
              <PhoneNumber>
                mobile phone: {contact.phones[0].number}
              </PhoneNumber>
              {/* <p>
                {contact.phones.map((phone: phones, phoneIndex: number) => (
                  <span key={phoneIndex}>
                    Phone Number: {phone.number}
                    {phoneIndex < contact.phones.length - 1 && <br />}
                  </span>
                ))}
              </p> */}
            </CardWrapper>
          ))}
      </Content>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextClick={handleNextClick}
        handlePageChange={handlePageChange}
        handlePrevClick={handlePrevClick}
      />
    </Main>
  );
};

const Title = styled.h4`
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
`;

const Main = styled.main`
  padding: 2rem 1.6rem;
  height: 100vh;
`;

const Content = styled.div`
  margin-top: 2.4rem;
`;

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

const AddForm = styled(AddIcon)`
  color: white;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const WrapperTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default Home;
