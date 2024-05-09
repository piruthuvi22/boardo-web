import { Box, Chip } from "@mui/material";
import { SearchFilters } from "data/dataModels";

export default function FiltersBar({
  filters,
  setFilters,
}: {
  filters: SearchFilters;
  setFilters: Function;
}) {
  const format = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <>
      {
        // Loop filter object keys
        Object.keys(filters).length > 0 &&
          Object.keys(filters)?.map((key: string) => {
            return (
              <Chip
                key={key}
                variant="outlined"
                color="primary"
                size="small"
                label={format(key) + ": " + filters[key]}
                onDelete={() => {
                  const newFilters = { ...filters };
                  delete newFilters[key];
                  setFilters(newFilters);
                }}
              />
            );
          })
      }
    </>
  );
}
