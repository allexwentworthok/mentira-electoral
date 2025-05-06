
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AdFilters } from "@/types/ads";

interface AdFiltersComponentProps {
  filters: AdFilters;
  onFilterChange: (newFilters: AdFilters) => void;
}

const AdFiltersComponent: React.FC<AdFiltersComponentProps> = ({ filters, onFilterChange }) => {
  const handleSortByChange = (value: 'spend' | 'date') => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleSortOrderChange = (value: 'asc' | 'desc') => {
    onFilterChange({ ...filters, sortOrder: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-secondary rounded-md">
      <div className="space-y-1">
        <Label htmlFor="sortBy">Ordenar por</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleSortByChange(value as 'spend' | 'date')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spend">Gasto</SelectItem>
            <SelectItem value="date">Fecha</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="sortOrder">Orden</Label>
        <Select
          value={filters.sortOrder}
          onValueChange={(value) => handleSortOrderChange(value as 'asc' | 'desc')}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descendente</SelectItem>
            <SelectItem value="asc">Ascendente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdFiltersComponent;
