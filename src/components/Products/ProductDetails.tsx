import { Container, Typography, CardContent, Card, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import LocationStateType from "../../types/LocationStateType";
import ProductType from "../../types/ProductType";

function ProductDetails() {
  const location = useLocation();
  const { state }: LocationStateType = location;
  const { id, price, description, title, quantity } : ProductType = state as ProductType;

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          pt: 5,
        }}
      >
        <Typography component="h1" variant="h5">
          Product details
        </Typography>

        <Box sx={{ minWidth: 500, pt: 5 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                ID : {id}
              </Typography>
              <Typography variant="h5" component="div">
                Title : {title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Description : {description}
              </Typography>
              <Typography variant="body2">Price : {price}</Typography>
              <Typography variant="body2">Quantity: {quantity}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetails;
