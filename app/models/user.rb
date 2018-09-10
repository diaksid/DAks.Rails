class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :registerable, :confirmable, :recoverable, :omniauthable
  devise :database_authenticatable,
         :rememberable, :trackable, :validatable, :lockable, :timeoutable

  before_save :check_access

  def to_s
    (name.blank? ? email : name).to_s
  end

  def admin?
    is_admin
  end

  def staff?
    in_staff
  end

  private

  def check_access
    self.in_staff = true if self.is_admin
  end
end
