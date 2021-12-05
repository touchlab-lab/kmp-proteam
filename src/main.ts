import * as core from '@actions/core'
import * as github from '@actions/github'
import {wait} from './wait'
import {registerbuild} from './registerbuild'

async function run(): Promise<void> {
    try {
        const operation: string = core.getInput("operation")
        switch (operation) {
            case "registerbuild": {
                await registerbuildOperation()
                break
            }
            default: {
                await defaultOperation()
                break
            }
        }

    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

async function registerbuildOperation() {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ok alright ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await registerbuild(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
}

async function defaultOperation() {
    const ms: string = core.getInput('milliseconds')
    console.log(`github.context.payload.action: ${github.context.payload.action}`)
    console.log(`github.context.apiUrl: ${github.context.apiUrl}`)
    console.log(`github.context.ref: ${github.context.ref}`)
    console.log(`github.context.job: ${github.context.job}`)
    console.log(`github.context.workflow: ${github.context.workflow}`)
    console.log(github.context)
    core.debug(`Waiting ${ms} milliseconds ok alright ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
}

run()
