import { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Input, Pagination, ListContact } from "../../components";
import { GET_CONTACT_LIST_QUERY } from "../../apollo/queries/getContactList";
import { contact } from "../../Models/get_contact_list";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_CONTACT_LIST_QUERY, {
    variables: {
      order_by: { first_name: "asc" },
      where: { first_name: { _like: `%${query}%` } },
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

  const filteredContacts = data?.contact.filter((contact: contact) =>
    contact.first_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Main>
      <WrapperTitle>
        <Title>Contacts</Title>
        <AddForm onClick={() => navigate("/create-contact")} />
      </WrapperTitle>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search your contact"
        inputType="search"
      />
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <>
          
          <Content>
            {filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((contact: contact) => (
                <ListContact contact={contact} key={contact.id} />
              ))
            ) : (
              <NotFoundContact>No matching contacts found</NotFoundContact>
            )}
          </Content>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextClick={handleNextClick}
            handlePageChange={handlePageChange}
            handlePrevClick={handlePrevClick}
          />
        </>
      )}
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

const Loading = styled.div`
  font-size: 20px;
  display: flex;
  text-align: center;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const NotFoundContact = styled.p`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

export default Home;
