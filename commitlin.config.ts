// commintlin.confg.ts
import {RuleConfigSeverity, type UserConfig} from '@commitlint/types'

const config: UserConfig = {
   extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [RuleConfigSeverity.Error, "always", ["foo"]], 
  },
}

export default config