class MessagesController < ApplicationController
  def index
    @messages = Message.all.order(created_at: :desc)
  end
  def new
    @message = Message.new
  end
  
  def create
    Message.create(message_params)
    redirect_to root_path, notice: 'メッセージを投稿しました'
  end

  private
  def message_params
    params.require(:message).permit(:title, :image, :text)
  end
end
