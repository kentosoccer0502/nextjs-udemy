'use client'
import { submitContactForm } from "@/lib/actions/contact"
import { useActionState, useState } from "react"
import { ContactSchema } from "@/validations/contact"
import { z } from "zod"

export default function ContactForm() {
  // サーバー側の送信処理とフォームの状態（エラーや成功）を管理
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    errors: {}
  })

  // クライアント側（画面上）のエラーメッセージを管理
  const [clientErrors, setClientErrors] = useState({name:'', email:''})

  // 入力欄からフォーカスが外れたときに呼ばれる関数
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target // どの欄か・入力値を取得

    try {
      if (name === 'name') {
        // 「名前」欄のバリデーション（入力チェック）
        ContactSchema.pick({name: true}).parse({name: value})
      } else if (name === 'email') {
        // 「メールアドレス」欄のバリデーション（入力チェック）
        ContactSchema.pick({email: true}).parse({email: value})
      }
      // バリデーションOKなら、その欄のエラーを消す
      setClientErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    } catch(error) {
      if (error instanceof z.ZodError) {
        // バリデーションNGなら、エラーメッセージをセット
        const errorMessage = error.errors[0]?.message || ''
        setClientErrors( prev => ({
          ...prev,
          [name]: errorMessage
        }))
      }
    }
  }

  return (
    <div>
      {/* フォーム送信時はformActionが呼ばれる */}
      <form action={formAction}>
        <div className="py-24 text-gray-600">
            <div className="mx-auto flex flex-col bg-white shadow-md p-8 md:w-1/2">
                <h2 className="text-lg mb-2">お問い合わせ</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="text-sm">名前</label>
                    {/* 名前入力欄。onBlurでhandleBlurが実行される */}
                    <input type="text" id="name" name="name"
                    onBlur={handleBlur}
                    className="
                    w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 outline-none py-1 px-3 leading-8" />
                    {/* クライアント側のエラー表示 */}
                    { clientErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
                    )}
                    {/* サーバー側のエラー表示 */}
                    { state.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.name.join(',')}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="text-sm">メールアドレス</label>
                    {/* メールアドレス入力欄。onBlurでhandleBlurが実行される */}
                    <input type="text" id="email" name="email"
                    onBlur={handleBlur}
                    className="
                    w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 outline-none py-1 px-3 leading-8" />
                    {/* クライアント側のエラー表示 */}
                    { clientErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
                    )}
                    {/* サーバー側のエラー表示 */}
                    { state.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.email.join(',')}</p>
                    )}
                </div>
                {/* 送信ボタン */}
                <button className="text-white bg-indigo-500 py-2 px-6 hover:bg-indigo600 text-lg">送信</button>
            </div>
        </div>
      </form>
    </div>
  )
}
