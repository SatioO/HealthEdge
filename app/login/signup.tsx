import { Formik, yupToFormErrors } from "formik";
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
const loginValidationSchema = yup.object().shape({
    name: yup
    .string()
    .required('name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
export default function signUp(){
    function onSubmit(){

    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Formik validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '', name: ''}}
        onSubmit={onSubmit}>
            {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
            <>
            <View style={styles.inputContainer}>
                <Icon name="person-outline" size={25} style={styles.icon}/>
                <TextInput style={styles.input}
                placeholder="Name"
                keyboardType="default"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value = {values.name}
                />
            </View>
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.logIn}>
                    Already have an account? 
                    <Text style={styles.logInLink}>Log In</Text>
                </Text>
            </TouchableOpacity>
            </>
        )}
            </Formik>
    </View>
    );
 }
        

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection:"row",
        alignItems:"center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        width: "100%",
        backgroundColor: "#fff",
    },
    icon:{
        marginRight: 10,
        color: "#888",
    },
    input:{
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    errorText:{
        color:"red",
        fontSize: 12,
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    button:{
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    buttonText:{
        color:"#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonDisabled:{
        backgroundColor: "#a9d7ff",
    },
    logIn:{
        marginTop:15,
        color:"#333",
        fontSize: 14,
    },
    logInLink:{
        color: "#007bff",
        fontWeight: "bold"
    },
});