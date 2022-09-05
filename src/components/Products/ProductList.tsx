import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Button, Grid, Alert, AlertColor } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import Skeleton from "@mui/material/Skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  GridRowsProp,
  DataGridPro,
  GridColumns,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { deleteProduct, productList } from "../../services";

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(10)].map((_) => (
      <Skeleton key={`${new Date().getTime()}_${Math.random()}`} variant="rectangular" sx={{ my: 4, mx: 1 }} />
    ))}
  </Box>
);

export default function ProductList() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [alertMessages, setAlertMessages] = useState({
    id: "",
    message:""
  })
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery("productList", productList, {
    refetchInterval: 600000,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: mDeleteProduct } = useMutation(deleteProduct, {
    onSuccess: () => {
      setAlertMessages({ id: "success", message: "Record delete successfully!"});
      queryClient.invalidateQueries("productList");
    },
  });

  useEffect(() => {
    if (product) {
      setRows([...product.products]);
    }
  }, [product]);

  useEffect(() => {
    if(error){
      setAlertMessages({ id: "error", message: "Oops!, something went wrong!"});
    }
  },[error])

  const addProduct = () => {
    navigate("/create");
  };

  const handleViewClick = (action: any) => () => {
    navigate("/details", { state: action.row });
  };

  const handleEditClick = (action: any) => () => {
    navigate(`/edit/${action.id}`);
  };

  const handleDeleteClick = (action: any) => async () => {
    await mDeleteProduct(action.id);
  };

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 200,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 200,
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      width: 200,
      cellClassName: "details",
      getActions: (action: any) => {
        return [
          <GridActionsCellItem
            icon={<PreviewIcon />}
            label="View"
            className="textPrimary"
            onClick={handleViewClick(action)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (action: any) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(action)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(action)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
    {alertMessages.id && <Alert onClose={() => setAlertMessages({ id: "", message: ""})} severity={alertMessages.id as AlertColor}>{alertMessages.message as ReactNode}</Alert>}
    <Container maxWidth={false}>
      <Grid sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={addProduct}>
            <AddIcon />
            Add Product
          </Button>
        </Box>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            pt: 5,
          }}
        >
          <DataGridPro
            rows={rows}
            columns={columns}
            editMode="row"
            components={{
              LoadingOverlay: LoadingSkeleton,
            }}
            loading={isLoading}
          />
        </Box>
      </Grid>
    </Container>
    </>
  );
}
