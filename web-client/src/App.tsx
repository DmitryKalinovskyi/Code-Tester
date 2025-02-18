import ConfigProvider from 'antd/es/config-provider';
import './App.css'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './lib/state/store';
import EditorPage from './pages/editor';

function App() {
    return <ConfigProvider theme={{
        token: {
            colorPrimary: '#6200ff',
            borderRadius: 10
        }
    }}>
        <ReduxProvider store={store}>
            <EditorPage/>
        </ReduxProvider>
    </ConfigProvider>;
}

export default App
