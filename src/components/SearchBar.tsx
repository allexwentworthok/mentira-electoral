
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch: (terms: string[]) => void;
  initialTerms?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialTerms = [] }) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(initialTerms);
  const [currentTerm, setCurrentTerm] = useState("");

  const handleAddTerm = () => {
    if (currentTerm.trim() && !searchTerms.includes(currentTerm.trim())) {
      const newTerms = [...searchTerms, currentTerm.trim()];
      setSearchTerms(newTerms);
      setCurrentTerm("");
    }
  };

  const handleRemoveTerm = (index: number) => {
    const newTerms = searchTerms.filter((_, i) => i !== index);
    setSearchTerms(newTerms);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTerm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={currentTerm}
            onChange={(e) => setCurrentTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Partido, candidato o tema..."
            className="flex-grow"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddTerm}
            disabled={!currentTerm.trim()}
          >
            Agregar
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 my-2">
          {searchTerms.length > 0 ? (
            searchTerms.map((term, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
                {term}
                <button
                  type="button"
                  onClick={() => handleRemoveTerm(index)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Agregue términos para buscar anuncios políticos
            </span>
          )}
        </div>
      </div>

      <Button type="submit" disabled={searchTerms.length === 0}>
        Buscar anuncios
      </Button>
    </form>
  );
};

export default SearchBar;
