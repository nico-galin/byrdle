import WordGrid from "../../components/WordGrid/WordGrid";
import { useWords } from "../../contexts/wordData";

const FiveLetters = ({ word }) => {
    const { words, loading} = useWords();
    return loading ? <div /> : (
        <WordGrid word={!!words ? words["5"] : ""} len={5}/>
    )
}
export default FiveLetters;