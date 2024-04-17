import Button from "../components/Button"
import Heading from "../components/Heading"
import Inputbox from "../components/Inputbox"
import Subheading from "../components/Subheading"
import Warning from "../components/Warning"

const Signin = () => {
    return(
            <div className="flex h-screen justify-center items-center">
            <div className="shadow-lg p-6 w-[328px] border-2 rounded-lg">
                    <Heading label="Sign In"/>
                    <Subheading label="Enter your credentials to access your account"/>
                    <Inputbox name="Email" placeholder="johndoe@example.com"/>
                    <Inputbox name="Password"/>
                    <Button title="Sign In "/>
                    <Warning title="Don't have an account?" btnText="signup" to="/"/>
            </div>
            </div>
    )
}

export default Signin