import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ContestantData {
  place: string;
  name: string;
  city: string;
  barcode: string;
}

interface ContestantsContext {
  contestants: ContestantData[];
  fetchContestants: () => void;
}

interface ContestantsContextProps {
  children: ReactNode;
}

const ContestantsContext = createContext<ContestantsContext | null>(null);

function ContestantsContextProvider({ children }: ContestantsContextProps) {
  const [contestants, setContestants] = useState<ContestantData[]>([]);

  const fetchContestants = async () => {
    try {
      const { data } = await axios.get<ContestantData[]>(
        "http://localhost:3001/contestants"
      );
      setContestants(data);
    } catch (error) {
      console.log("Unsuccesfull fetch: ", error);
    }
  };

  useEffect(() => {
    fetchContestants();
  }, []);

  return (
    <ContestantsContext.Provider value={{ contestants, fetchContestants }}>
      {children}
    </ContestantsContext.Provider>
  );
}

export function useContestantsContext() {
  const context = useContext(ContestantsContext);
  if (context === null) {
    throw new Error(
      "useContestantsContext must be used within ContestantsContextProvider."
    );
  }
  return context;
}

export default ContestantsContextProvider;
