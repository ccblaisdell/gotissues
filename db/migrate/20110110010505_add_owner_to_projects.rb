class AddOwnerToProjects < ActiveRecord::Migration
  def self.up
    change_table :projects do |t|
      t.references :owner
    end
    
    add_index :projects, :owner_id
  end

  def self.down
    drop_column :projects, :owner_id
  end
end
