import { useEffect, useState } from "react";
import GenericModal from "./GenericModal";
import { TextField2 } from "./ui-component/customizedComponents";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import { PAYMENT_METHODS } from "data/paymentTypes";
import { SearchFilters } from "data/dataModels";
import { Clear } from "@mui/icons-material";

export function Filters({
  openFilters,
  closeModal,
  filters,
  applyFilters,
}: {
  openFilters: boolean;
  closeModal: () => void;
  filters: SearchFilters | null;
  applyFilters: (filters: SearchFilters) => void;
}) {
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [minBudget, setMinBudget] = useState<number | null>(null);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    if (filters) {
      setPlaceName(filters.placeName || "");
      setPlaceDescription(filters.placeDescription || "");
      setMinBudget(filters.minBudget || null);
      setMaxBudget(filters.maxBudget || null);
      setRating(filters.rating || null);
      setRadius(filters.radius || null);
      setPaymentType(filters.paymentType || "");
    }
  }, [filters]);

  const handleFilters = () => {
    const filters = {
      ...(placeName && { placeName }),
      ...(minBudget && { minBudget }),
      ...(maxBudget && { maxBudget }),
      ...(rating && { rating }),
      ...(radius && { radius }),
      ...(paymentType && { paymentType }),
      ...(placeDescription && { placeDescription }),
    };
    applyFilters(filters);
    closeModal();
  };

  const handleClearFilters = () => {
    setPlaceName("");
    setPlaceDescription("");
    setMinBudget(null);
    setMaxBudget(null);
    setRating(null);
    setRadius(null);
    setPaymentType("");

    applyFilters({});
    closeModal();
  };

  return (
    <GenericModal open={openFilters} closeModal={closeModal} title="Filters">
      <Box>
        <Box display={"flex"} gap={2}>
          <TextField2
            label="Place Name"
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{}}
                  size="small"
                  onClick={() => setPlaceName("")}
                >
                  <Clear sx={{ fontSize: "18px" }} />
                </IconButton>
              ),
            }}
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />

          <TextField2
            label="Place Description"
            value={placeDescription}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{}}
                  size="small"
                  onClick={() => setPlaceDescription("")}
                >
                  <Clear sx={{ fontSize: "18px" }} />
                </IconButton>
              ),
            }}
            onChange={(e) => setPlaceDescription(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <Typography variant="body1" py={2}>
            Budget
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <TextField2
              type="number"
              label="Min Budget"
              value={minBudget}
              inputProps={{ min: 0 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{}}
                    size="small"
                    onClick={() => setMinBudget(null)}
                  >
                    <Clear sx={{ fontSize: "18px" }} />
                  </IconButton>
                ),
              }}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => setMinBudget(parseFloat(e.target.value))}
            />

            <TextField2
              type="number"
              label="Max Budget"
              value={maxBudget}
              inputProps={{ min: minBudget }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{}}
                    size="small"
                    onClick={() => setMaxBudget(null)}
                  >
                    <Clear sx={{ fontSize: "18px" }} />
                  </IconButton>
                ),
              }}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => setMaxBudget(parseFloat(e.target.value))}
            />
          </Box>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={2} mt={3}>
          <Box>
            <Typography variant="body1" py={1}>
              Rating
            </Typography>
            <Rating
              name="rating"
              size="large"
              value={rating}
              precision={0.5}
              onChange={(e, newValue) => setRating(newValue || 0)}
            />
          </Box>
          <Typography variant="body1" alignSelf={"center"}>
            {rating} and up{" "}
            <IconButton sx={{}} size="small" onClick={() => setRating(null)}>
              <Clear sx={{ fontSize: "18px" }} />
            </IconButton>
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          // justifyContent={"space-between"}
          gap={2}
          mt={3}
        >
          <Box flexGrow={1}>
            <Typography variant="body1" py={2}>
              Radius (meters) from your location
            </Typography>
            <TextField2
              type="number"
              label="Radius (meters)"
              value={radius}
              inputProps={{ min: 500 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{}}
                    size="small"
                    onClick={() => setRadius(null)}
                  >
                    <Clear sx={{ fontSize: "18px" }} />
                  </IconButton>
                ),
              }}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
            />
          </Box>
          <Box flexGrow={1}>
            <Typography variant="body1" py={2}>
              Payment type
            </Typography>
            <TextField2
              fullWidth
              select
              label="Payment type"
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{}}
                    size="small"
                    onClick={() => setPaymentType("")}
                  >
                    <Clear sx={{ fontSize: "18px" }} />
                  </IconButton>
                ),
              }}
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              {PAYMENT_METHODS.map((paymentMethod) => (
                <MenuItem key={paymentMethod.id} value={paymentMethod.value}>
                  {paymentMethod.name}
                </MenuItem>
              ))}
            </TextField2>
          </Box>
        </Box>

        <Box mt={3} gap={1} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClearFilters}
            sx={{ textTransform: "none" }}
          >
            Clear Filters
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFilters}
            sx={{ textTransform: "none" }}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </GenericModal>
  );
}
