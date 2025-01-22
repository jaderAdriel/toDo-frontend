import TaskBoard from "../components/TaskBoard";
import './Home.css'
import {TaskProdiver} from "../context/TaskContext";

function Home() {

    return (
        <main id="content">
            <TaskProdiver>
                <TaskBoard />
            </TaskProdiver>
        </main>
    );
}
  
export default Home;