import React from "react";
import { Pagination, Stack, Box,styled } from "@mui/material";
import { useSelector } from "react-redux";
import "./page.css"

const BasicPagination = ({ getPageNo, page }) => {
  const { numberOfPages } = useSelector((state) => state.todos);
  // const Page = styled(Box)`
    
  // `;

  return (
    <div id='div1'>
      <Stack spacing={2}>
        <Pagination className="pagination"
          count={numberOfPages}
          page={page}
          shape="rounded"
          onChange={getPageNo}
        />
      </Stack>
    </div>
  );
};

export default BasicPagination;
