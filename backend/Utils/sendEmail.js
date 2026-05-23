const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendOrderConfirmation = async (toEmail, order, userName) => {
  const itemsList = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.product?.name || 'Product'}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.size}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('')

  await resend.emails.send({
    from: 'FÄBERY Collections <onboarding@resend.dev>',
    to: toEmail,
    subject: 'Order Confirmed — FÄBERY Collections',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <h1 style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">FÄBERY COLLECTIONS</h1>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <h2 style="font-size: 18px;">Thank you for your order, ${userName}! 🎉</h2>
        <p style="color: #666; font-size: 14px;">Your order has been placed successfully. Here's a summary:</p>

        <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 13px; color: #999; margin: 0;">Order ID</p>
          <p style="font-size: 14px; font-weight: bold; margin: 4px 0;">${order._id}</p>
          <p style="font-size: 13px; color: #999; margin: 8px 0 0;">Status</p>
          <p style="font-size: 14px; font-weight: bold; margin: 4px 0; text-transform: capitalize;">${order.status}</p>
        </div>

        <h3 style="font-size: 16px;">Items Ordered</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f0f0f0;">
              <th style="padding: 8px; text-align: left;">Product</th>
              <th style="padding: 8px; text-align: left;">Size</th>
              <th style="padding: 8px; text-align: left;">Qty</th>
              <th style="padding: 8px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
          <p style="font-size: 16px; font-weight: bold;">Total: ₹${order.totalAmount}</p>
          <p style="font-size: 13px; color: #666;">Payment: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <h3 style="font-size: 16px;">Shipping Address</h3>
        <p style="font-size: 14px; color: #444; line-height: 1.6;">
          ${order.shippingAddress.fullName}<br/>
          ${order.shippingAddress.address}<br/>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br/>
          Phone: ${order.shippingAddress.phone}
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          This is an automated email from FÄBERY Collections. Please do not reply to this email.
        </p>
      </div>
    `
  })
}

module.exports = sendOrderConfirmation