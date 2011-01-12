class Project < ActiveRecord::Base
  has_many :issues, :dependent => :destroy 
  belongs_to :owner, :class_name => "User"
  has_and_belongs_to_many :users
  
  validates_uniqueness_of :name, :slug
  acts_as_url :name, :url_attribute => :slug
  
  scope :open, :conditions => {:open => true}
  scope :closed, :conditions => {:open => false}
  scope :access_granted_to_user, lambda { |user_id| { :joins => :users, 
                                         :conditions => {:users => {:id => user_id} } } }
  scope :owned_by, lambda { |user_id| {:conditions => ["owner_id = ?", user_id]}}
  scope :accessible_by, lambda {|user_id| (owned_by(user_id) + access_granted_to_user(user_id)) }
  
  def to_param
    slug
  end
end
