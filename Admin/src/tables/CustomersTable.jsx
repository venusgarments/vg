import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const CustomersTable = ({ customers = [] }) => {
  const navigate = useNavigate();

  const recentCustomers = customers.slice(0, 5);

  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
      }}
    >
      <CardHeader
        title="New Customers"
        sx={{
          pt: 2,
          alignItems: 'center',
          '& .MuiCardHeader-action': { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate('/customers')}
            variant="caption"
            sx={{
              color: '#6A1B9A',
              cursor: 'pointer',
              paddingRight: '.8rem',
              fontWeight: 600,
            }}
          >
            View All →
          </Typography>
        }
        titleTypographyProps={{
          variant: 'h6',
          sx: {
            fontWeight: 700,
            color: '#000',
            letterSpacing: '0.3px !important',
          },
        }}
      />

      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label="new customers">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentCustomers.length > 0 ? (
              recentCustomers.map((item, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': { border: 0 },
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/customers')}
                >
                  <TableCell>
                    <Avatar
                      alt={item.name}
                      src={item.image || '/default-avatar.png'}
                      sx={{ width: 42, height: 42 }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontSize: '.9rem', color: '#333' }}>
                    {item.email}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No customers found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomersTable;
