#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

const isWin = process.platform === 'win32'

function getHuskyDir() {
  const { dirname } = require('path')
  const { fileURLToPath } = require('url')
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return path.join(__dirname, '..')
}

function getGitHooksDir() {
  const huskyDir = getHuskyDir()
  return path.join(huskyDir, '.git', 'hooks')
}

function getHuskyScriptsDir() {
  const huskyDir = getHuskyDir()
  return path.join(huskyDir, '.husky')
}

function getHuskyScript(hookName) {
  const scriptsDir = getHuskyScriptsDir()
  return path.join(scriptsDir, hookName)
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      ...options
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })

    child.on('error', (error) => {
      reject(error)
    })
  })
}

async function main() {
  const hookName = process.argv[2]
  
  if (!hookName) {
    console.error('Hook name is required')
    process.exit(1)
  }

  const scriptPath = getHuskyScript(hookName)
  
  try {
    if (isWin) {
      await runCommand('sh', [scriptPath])
    } else {
      await runCommand('sh', [scriptPath])
    }
  } catch (error) {
    console.error(`Error running hook ${hookName}:`, error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  getHuskyDir,
  getGitHooksDir,
  getHuskyScriptsDir,
  getHuskyScript,
  runCommand
} 