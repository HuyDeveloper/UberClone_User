import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/components/Navigation";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Provider } from "react-redux";
import { store} from './src/app/store'

export default function App() {
  return (
    <Provider store={store}>
    <AuthProvider>

      <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height' } className='flex-1'>

        <Navigation/>
        
     </KeyboardAvoidingView>

    </AuthProvider>
    </Provider>
  );
}