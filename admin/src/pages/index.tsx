import React from 'react'
import { Layout } from '../components/Layout'
import { Content } from '../components/Content'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Index = () => {
    // Is user signed in?
    const [cookie, setCookie] = useCookies(["token"])
    const [isAuth, setIsAuth] = React.useState(false)
    const [uData, setUData] = React.useState({})
  
    React.useEffect(() => {
        if (cookie.token !== undefined) {
            setIsAuth(true)
        }

        if (isAuth) {
            axios.post('/api/id/getProfile', {
                token: cookie.token
            }).then((res) => {
                setUData(res.data)
            })
        }
    })

    return (
        <Layout uData={uData} isAuth={isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div>
                        <h1>Welcome to the Dot HQ Update Server!</h1>
                        {isAuth && (
                            <p>Hi, {uData.name}</p>
                        )}
                        {!isAuth && (
                            <p>Please sign in to continue.</p>
                        )}
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Index;