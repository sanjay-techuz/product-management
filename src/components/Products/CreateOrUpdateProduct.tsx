import { ReactNode, useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router";
import { Container, Grid, Typography, TextField, Button, Alert, AlertColor  } from "@mui/material";
import styles from "./CreateOrUpdateProduct.css";
import { Box } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateProduct, createProduct, getProduct } from "../../services";
import { useNavigate } from "react-router";
import ProductType from "../../types/ProductType";

function CreateOrUpdateProduct() {
  const [isEdit, setIsEdit] = useState(false);
  const [product, setProduct] = useState<ProductType>({});
  const [alertMessages, setAlertMessages] = useState({
    id: "",
    message:""
  })
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery(["getProduct", id], getProduct);

  const { mutateAsync: mCreateProduct } = useMutation(createProduct, {
    onSuccess: () => {
      setAlertMessages({ id: 'success', message: 'Record created successfully!'})
      setTimeout(() => {
        navigate(-1);
        queryClient.invalidateQueries("productList");
      },2000)
    },
    onError: () => {
      setAlertMessages({ id: 'error', message: 'Oops!, something went wrong!'})
    }
  });

  const { mutateAsync: mUpdateProduct } = useMutation(updateProduct, {
    onSuccess: () => {
      setAlertMessages({ id: 'success', message: 'Record updated successfully!'})
      setTimeout(() => {
        navigate(-1);
        queryClient.invalidateQueries("productList");
      },2000)
    },
    onError: () => {
      setAlertMessages({ id: 'error', message: 'Oops!, something went wrong!'})
    }
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setProduct(data.products_by_pk);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevState: ProductType) => ({ ...prevState, [name]: value }));
  };

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isEdit) {
      await mUpdateProduct(product);
    } else {
      await mCreateProduct(product);
    }
  };

  return (
    <>
      {alertMessages.id && (
        <Alert
          onClose={() => setAlertMessages({ id: "", message: "" })}
          severity={alertMessages.id as AlertColor}
        >
          {alertMessages.message as ReactNode}
        </Alert>
      )}
      <Container component="main" maxWidth={false}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 5,
          }}
        >
          <div className={styles.mainHeader}>
            <Typography component="h1" variant="h5" align="center">
              {isEdit ? "Edit" : "Create"} product
            </Typography>
            <form onSubmit={handleClick}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={product["title"]}
                    name="title"
                    fullWidth
                    id="title"
                    label="Title"
                    variant="standard"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={product["description"]}
                    fullWidth
                    id="description"
                    label="Description"
                    variant="standard"
                    name="description"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={product["price"]}
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    variant="standard"
                    type={"number"}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={product["quantity"]}
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    id="quantity"
                    variant="standard"
                    type={"number"}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: 5 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default CreateOrUpdateProduct;
