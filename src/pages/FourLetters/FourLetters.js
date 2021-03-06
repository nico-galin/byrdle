import WordGrid from "../../components/WordGrid/WordGrid";
import { useWords } from "../../contexts/wordData";

const FourLetters = () => {
    const { words, loading} = useWords();
    return loading ? <div /> : (
        <WordGrid word={!!words ? words["4"] : ""} len={4}/>
    )
}
export default FourLetters;