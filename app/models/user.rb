class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name
  
  has_many :issues
  has_many :assignments, :class_name => "Issue", :foreign_key => "assignee_id"
  has_many :comments
  has_and_belongs_to_many :projects
  
  def owns?(project)
    self == project.owner
  end
  
  def can_edit?(item)
    return true if self.admin?
    
    case item.class
    when Comment
      return (self == item.user or self == item.issue.project.owner)
    else
      false
    end
  end
  
  protected
  
  def password_required?
    !persisted? || password.present? || password_confirmation.present?
  end
end
