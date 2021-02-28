import React from 'react'
import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Button } from '../../components/Button'
import { TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core'
import { FormLocaleSelector } from '../../components/Form/Locale'

const AddLocale = () => {
    return (
        <Layout>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <h1>Add a Locale</h1>
                    </div>
                </div>
            </Content>
            <Content>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <div className={'form-control'}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="lName"
                                name="lName"
                                label="Locale name (Ex. en-GB)"
                                value={null}
                                onChange={null}
                                error={null}
                                helperText={'Locale name for use within Admin UI.'}
                            />
                        </div>
                    </div>
                </div>
            </Content>
            <Content primary>
                <div className={'grid'}>
                    <div className={'flex-grid'}>
                        <span />
                        <Button type={'primary'}>
                            Add Locale
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default AddLocale;