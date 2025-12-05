// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination } from '@mui/material'
import {allUser} from "../Redux/Auth/Action"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const dispatch = useDispatch();

  // if your reducer stores userList as either an array or an object { users: [], currentPage, totalPages }
  const { userList, isLoading, currentPage: storePage, totalPages: storeTotal } = useSelector(
    (store) => store.auth
  );

  // Normalize to an array for rendering:
  const users = Array.isArray(userList) ? userList : userList?.users || [];

  // Prefer pagination values from store.auth root fields; fall back to userList metadata if present
  const current = storePage || userList?.currentPage || page;
  const totalPages = storeTotal || userList?.totalPages || 1;

  useEffect(() => {
    dispatch(allUser(page)); // pass page to action
  }, [dispatch, page]);

  function handlePaginationChange(event, value) {
    setSearchParams({ page: value.toString() });
  }

  return (
    <Box>
      <Card>
        <CardHeader
          title="All Customers"
          sx={{ pt: 2, alignItems: "center", "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((item, index) => (
                  <TableRow
                    hover
                    key={item._id || item.email || index}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar alt={`${item.firstName || ""} ${item.lastName || ""}`} src={item.image || "/default-avatar.png"} />
                    </TableCell>
                    <TableCell>{`${item.firstName || ""} ${item.lastName || ""}`}</TableCell>
                    <TableCell>{item.email || "—"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body2">No customers found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={totalPages}
          page={current}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default Customers;


