const assert = require('assert');
const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3;
describe('mycalculatordapp', () => {
    const provider = anchor.Provider.local();
    anchor.setProvider(provider);

    const calculatorAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Mycalculatordapp;

    it('creates a calculator', async() => {
        await program.rpc.create("Welcome to My Calculator DApp", {
            accounts: {
                calculator: calculatorAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculatorAccount]
        })

        const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
        assert.ok(account.greeting === "Welcome to My Calculator DApp");
    })

    it('adds two numbers', async() => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3),  {
            accounts: {
                calculator: calculatorAccount.publicKey,
            }
        })

        const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)));
    })

    it('substract two numbers', async() => {
        await program.rpc.substract(new anchor.BN(5), new anchor.BN(3),  {
            accounts: {
                calculator: calculatorAccount.publicKey,
            }
        })

        const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
        assert.ok(account.result.eq(new anchor.BN(2)));
    })

    it('multiply two numbers', async() => {
        await program.rpc.multiply(new anchor.BN(5), new anchor.BN(3),  {
            accounts: {
                calculator: calculatorAccount.publicKey,
            }
        })

        const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
        assert.ok(account.result.eq(new anchor.BN(15)));
    })

    it('divide two numbers', async() => {
        await program.rpc.divide(new anchor.BN(5), new anchor.BN(3),  {
            accounts: {
                calculator: calculatorAccount.publicKey,
            }
        })

        const account = await program.account.calculator.fetch(calculatorAccount.publicKey);
        assert.ok(account.result.eq(new anchor.BN(1)));
        assert.ok(account.remainder.eq(new anchor.BN(2)));
    })
})