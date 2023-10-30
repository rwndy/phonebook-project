import { ArrowBackIosNew as ArrowBackIosNewIcon } from "@mui/icons-material";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

interface PropPagination {
  handlePrevClick: () => void;
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
  handleNextClick: () => void;
}
const Pagination = ({
  currentPage,
  totalPages,
  handleNextClick,
  handlePageChange,
  handlePrevClick,
}: PropPagination) => {

  return (
    <PaginationContainer>
      <ButtonPrevious
        data-testid="previous"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <ArrowBackIosNewIcon />
      </ButtonPrevious>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <ButtonPageNumber
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          disabled={currentPage === pageNum}
        >
          {pageNum}
        </ButtonPageNumber>
      ))}
      <ButtonNext
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIosIcon />
      </ButtonNext>
    </PaginationContainer>
  );
};

const ButtonPrevious = styled.button`
  display: block;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border: 1px solid white;
  background-color: #ebffef;
  padding: 0.8rem;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 18px;
  left: 0;
  right: 0;
  display: inline-flex;
  justify-content: center;
`;

const ButtonPageNumber = styled.button`
  display: block;
  border: 1px solid white;
  background-color: #ebffef;
  padding: 0.8rem;
  cursor: pointer;
`;

const ButtonNext = styled.button`
  display: block;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: 1px solid white;
  background-color: #ebffef;
  padding: 0.8rem;
  cursor: pointer;
`;
export default Pagination;
