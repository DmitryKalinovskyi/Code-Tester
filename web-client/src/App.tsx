import ConfigProvider from 'antd/es/config-provider';
import './App.css'
import Console from './components/console';
import CodeEditor from './components/code-editor';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './state/store';

function App() {
    return <ConfigProvider theme={{
        token: {
            colorPrimary: '#6200ff',
            borderRadius: 10
        }
    }}>
        <ReduxProvider store={store}>
            <CodeEditor />
            <Console content="Demo" />
        </ReduxProvider>
    </ConfigProvider>;
}

export default App
