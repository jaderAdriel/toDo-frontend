import TaskBoard from "../components/TaskBoard";
import './Home.css'
import {TaskProvider} from "../context/TaskContext";
import {SideModalProvider} from "../context/SideModalContext";

function Home() {

    return (
        <main id="content">
            <SideModalProvider>
                <TaskProvider>
                    <TaskBoard />
                </TaskProvider>
            </SideModalProvider>

        </main>
    );
}
  
export default Home;