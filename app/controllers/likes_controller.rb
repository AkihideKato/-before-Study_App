class LikesController < ApplicationController
  # berfore_action :like_params

  # def create
  #   @like = Like.create(user_id: current_user.id, message_id: params[:message_id])
  #   @likes = Like.where(message_id: params[:message_id])
  #   # @messages = Message.all
  #   redirect_to messages_path
  # end

  # def destroy
  #   like = Like.find_by(user_id: current_user.id, message_id: params[:message_id])
  #   like.destroy
  #   @likes = Like.where(message_id: params[:message_id])
  #   # @messages = Message.all
  #   redirect_to messages_path
  # end
  # private

  # def like_params
  #   @messages = Message.find(params[:message_id])
  # end
  before_action :set_dream

  def create
    @like = Like.create(user_id: current_user.id, message_id: @message.id)
    # redirect_to messages_path
    respond_to do |format|
      format.html { redirect_to :root }
      format.json { render json: @like}
    end
  end

  def destroy
    @like = Like.find_by(user_id: current_user.id, message_id: @message.id)
    respond_to do |format|
      format.html { redirect_to :root }
      format.json { render json: @like}
    end
    @like.destroy
    # redirect_to messages_path
  end

  private
  def set_dream
    @message = Message.find(params[:message_id])
  end

end