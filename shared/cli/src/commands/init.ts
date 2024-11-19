import {Command, Flags} from '@oclif/core'

export default class Init extends Command {
  static description = 'Init Titan Core App with template'
  static examples = ['ttt init --template server-module']

  static flags = {
    template: Flags.string({char: 't', description: 'server-module', required: true}),
  }

  template = ['server-module']

  public async run(): Promise<void> {
    const {flags} = await this.parse(Init)

    if (!flags.template) {
      console.error(`Missing template.`)
      return
    }

    if (!this.template.includes(flags.template ?? '')) {
      console.error(`Allowed templates: ${this.template}`)
      return
    }

    console.log(`Init project with template: ${flags.template}`)
  }
}
