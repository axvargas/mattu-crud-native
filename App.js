import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
	StyleSheet,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Home from './views/Home'
import NewClient from './views/NewClient';
import ClientDetails from './views/ClientDetails';

import Bar from './components/ui/Bar'

const Stack = createStackNavigator()

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#1774F2',
		accent: '#0655BF'
	}
}

const App = () => {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.primary
						},
						headerTintColor: theme.colors.surface,
						headerTitleStyle: {
							fontWeight: 'bold'
						},
						headerTitleAlign: 'center'
					}}
				>
					<Stack.Screen
						name="Home"
						component={Home}
						options={({ navigation, route }) => ({
							headerLeft: (props) =>
								<Bar
									{...props}
									navigation={navigation}
									route={route}
								/>
						})}
					/>
					<Stack.Screen
						name="NewClient"
						component={NewClient}
						options={{ title: "New Client" }}
					/>
					<Stack.Screen
						name="ClientDetails"
						component={ClientDetails}
						options={{ title: "Client Details" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({

});

export default App;
