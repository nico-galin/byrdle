import WordGrid from "../../components/WordGrid/WordGrid";
import { useWords } from "../../contexts/wordData";

const SixLetters = ({ word }) => {
    const { words, loading} = useWords();
    return loading ? <div /> : (
        <WordGrid word={!!words ? words["6"] : ""} len={6}/>
    )
}
export default SixLetters;