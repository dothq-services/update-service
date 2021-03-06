import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import * as cookie from 'cookie'

const AddTarget = (props) => {
    const router  = useRouter();
    const [showSuccessScreen, setShowSuccessScreen] = React.useState(false)

    if (props.noAuth) {
        router.push('/noauth')
    }
    
    return (
        <Layout uData={props.userData} isAuth={props.isAuth}>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Add a Target</h1>
                    </div>
                </div>
            </Content>
            <Content visible={showSuccessScreen ? true : false}>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tDisplayName"
                                name="tDisplayName"
                                label="Target name (Ex. win64)"
                                helperText={'Target name for use within Admin UI.'}
                            />
                        </div>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="tName"
                                name="tName"
                                label="Target Advanced name (Ex. WINNT_x86_64-msvc)"
                                helperText={'Advanced Target Name.'}
                            />
                        </div>
                    </div>
                </div>
            </Content>

            <Content primary visible={showSuccessScreen ? true : false}>
                <div className={'form-grid'}>
                    <p>Add target aliases</p>
                </div>
            </Content>
            <Content primary visible={showSuccessScreen ? true : false}>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <span />
                        <Button color="primary" variant="contained" disableElevation>
                            Add Target
                        </Button>
                    </div>
                </div>
            </Content>

            <Content primary visible={showSuccessScreen ? false : true}>
                <div className={'grid'}>
                    <h3>Target Added Successfully!</h3>
                </div>
            </Content>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie)
    let userData = {};
    let isAuth: boolean = false;
    let noAuth: boolean = false;


    if (cookies.token !== undefined ) {
        await axios.post(`http://${context.req.headers.host}/api/id/getOrganizations`, {
            token: cookies.token
        }).then((res) => { 
            if (res.data.success === 'dothq') {
                isAuth = true
            }
        })
    }

    if (isAuth) {
        await axios.post(`http://${context.req.headers.host}/api/id/getProfile`, {
            token: cookies.token
        }).then((res) => {
            userData = res.data;
        })
    }

    if (cookies.token === undefined) {
        noAuth = true;
    }

    return {
        props: {
            cookies,
            isAuth,
            userData,
            noAuth
        }
    }
}

export default AddTarget;