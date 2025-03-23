import Header from './component/Header';
import DataContext from './DataContext';

function App() {
  return (
    <div>
      <DataContext>
        <Header />
      </DataContext>
    </div>
  );
}

export default App;
