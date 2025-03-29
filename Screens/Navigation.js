import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from './AuthScreen';
// Placeholder Dashboard components
const dashboard = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Student Dashboard</Text>
    </View>
);

const TeacherDashboard = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Teacher Dashboard</Text>
    </View>
);

const AdminDashboard = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Admin Dashboard</Text>
    </View>
);

const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen">
                <Stack.Screen 
                    name="AuthScreen" 
                    component={AuthScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={Dashboard}
                    options={{ headerLeft: null }}
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={Dashboard}
                    options={{ headerLeft: null }}
                />
                <Stack.Screen 
                    name="Dashboard" 
                    component={Dashboard}
                    options={{ headerLeft: null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};