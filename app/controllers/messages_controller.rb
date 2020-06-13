class MessagesController < ApplicationController
  def index
    @messages = Message.all.order(created_at: :desc)
  end
  def new
    @message = Message.new
  end
  
  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to root_path, notice: 'メッセージを投稿しました'
    else
      redirect_to new_message_path, notice: '空欄を記入してください'
    end
  end

  def show
    @message = Message.find(params[:id])
  end

  def edit
    @message = Message.find(params[:id])
  end

  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
    redirect_to root_path(@message), notice: 'メッセージを編集しました'
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    redirect_to root_path(@messge), notice: 'メッセージを削除しました'
  end

  def search
    @messages = Message.search(params[:keyword])
  end

  private
  def message_params
    params.require(:message).permit(:title, :image, :text)
  end
end
